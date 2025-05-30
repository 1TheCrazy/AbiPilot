// Streamline a centralized config from app.json
const fs = require('fs');
const path = require('path');

const config = require('../app.json');

const iosConfig = path.resolve(__dirname, '../ios/MyApp/Info.plist');
const androidManifest = path.resolve(__dirname, '../android/app/src/main/AndroidManifest.xml');
const gradleConfig = path.resolve(__dirname, '../android/app/build.gradle');

// --- Apply iOS config ---

// - Update values -

// --- Apply Android config ---
let manifestContent = fs.readFileSync(androidManifest, 'utf8');

// - Update values -

// Label
manifestContent = manifestContent.replace(/android:label="[^"]+"/g, `android:label="${config.displayName}"`);
// Supported Orientations
manifestContent = manifestContent.replace(/android:screenOrientation="[^"]+"/, `android:screenOrientation="${config.android.orientation}"`)

fs.writeFileSync(androidManifest, manifestContent);