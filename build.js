#!/usr/bin/env node

/**
 * DataCrew CMP Build Script
 *
 * Replaces {{COMMIT_HASH}} placeholder in template.tpl with the latest commit hash.
 * This ensures the CDN URL always points to a specific version.
 *
 * Usage:
 *   node build.js           - Build with current commit hash
 *   node build.js --restore - Restore placeholder (for development)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMPLATE_FILE = path.join(__dirname, 'template.tpl');
const PLACEHOLDER = '{{COMMIT_HASH}}';

function getCommitHash() {
    try {
        return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
        console.error('Error: Could not get commit hash. Make sure you are in a git repository.');
        process.exit(1);
    }
}

function readTemplate() {
    try {
        return fs.readFileSync(TEMPLATE_FILE, 'utf8');
    } catch (error) {
        console.error(`Error: Could not read ${TEMPLATE_FILE}`);
        process.exit(1);
    }
}

function writeTemplate(content) {
    try {
        fs.writeFileSync(TEMPLATE_FILE, content, 'utf8');
    } catch (error) {
        console.error(`Error: Could not write to ${TEMPLATE_FILE}`);
        process.exit(1);
    }
}

function build() {
    const commitHash = getCommitHash();
    let content = readTemplate();

    // Check if placeholder exists
    if (content.includes(PLACEHOLDER)) {
        content = content.replace(PLACEHOLDER, commitHash);
        writeTemplate(content);
        console.log(`✓ Replaced ${PLACEHOLDER} with ${commitHash}`);
    } else {
        // Check if already has a commit hash (40 char hex string after @)
        const hashRegex = /@([a-f0-9]{40})\/dist\/consent-bar\.min\.js/;
        const match = content.match(hashRegex);

        if (match) {
            const oldHash = match[1];
            if (oldHash === commitHash) {
                console.log(`✓ Already using current commit hash: ${commitHash}`);
            } else {
                content = content.replace(oldHash, commitHash);
                writeTemplate(content);
                console.log(`✓ Updated commit hash: ${oldHash.substring(0, 7)}... → ${commitHash.substring(0, 7)}...`);
            }
        } else {
            console.error(`Error: Neither ${PLACEHOLDER} nor existing commit hash found in template.`);
            process.exit(1);
        }
    }

    console.log(`\nTemplate ready for deployment.`);
    console.log(`CDN URL: https://cdn.jsdelivr.net/gh/DataCrew-Agency/datacrew-cmp@${commitHash}/dist/consent-bar.min.js`);
}

function restore() {
    let content = readTemplate();

    // Find and replace commit hash with placeholder
    const hashRegex = /@([a-f0-9]{40})\/dist\/consent-bar\.min\.js/;
    const match = content.match(hashRegex);

    if (match) {
        content = content.replace(match[1], PLACEHOLDER);
        writeTemplate(content);
        console.log(`✓ Restored placeholder: ${match[1].substring(0, 7)}... → ${PLACEHOLDER}`);
    } else if (content.includes(PLACEHOLDER)) {
        console.log(`✓ Placeholder already present: ${PLACEHOLDER}`);
    } else {
        console.error('Error: Could not find commit hash or placeholder in template.');
        process.exit(1);
    }
}

// Main
const args = process.argv.slice(2);

if (args.includes('--restore') || args.includes('-r')) {
    restore();
} else if (args.includes('--help') || args.includes('-h')) {
    console.log(`
DataCrew CMP Build Script

Usage:
  node build.js           Build with current commit hash
  node build.js --restore Restore {{COMMIT_HASH}} placeholder
  node build.js --help    Show this help message
`);
} else {
    build();
}
