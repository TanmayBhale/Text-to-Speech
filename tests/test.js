const { Builder, By, until } = require('selenium-webdriver');

(async function testTextToSpeechUI() {
    // Launch browser
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the web app
        await driver.get('http://localhost:5500/');

        // Wait for the title
        await driver.wait(until.titleIs('Text to Speech Convertor'), 5000);

        // Test: Enter text into textarea
        let textarea = await driver.findElement(By.css('.textarea'));
        await textarea.sendKeys('Hello, this is a test for text to speech.');

        // Test: Check speaker icon exists
        let speakerIcon = await driver.findElement(By.css('.speakerIcon'));
        let iconText = await speakerIcon.getText();
        if (iconText !== '🔈') {
            console.error('❌ Speaker icon not found or incorrect');
        } else {
            console.log('✅ Speaker icon present');
        }

        // Test: Click the "Text to Speech" button
        let button = await driver.findElement(By.css('.textToSpeechBtn'));
        await button.click();

        console.log('✅ Button click executed');

        // Wait a bit to observe
        await driver.sleep(5000);

    } catch (err) {
        console.error('❌ Test failed:', err);
    } finally {
        // Quit browser
        await driver.quit();
    }
})();
