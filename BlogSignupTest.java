package com.selenium.test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class BlogSignupTest {

    public static void main(String[] args) {
        // 1. Set path of ChromeDriver
        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\LAPTOP\\Desktop\\chromedriver.exe");

        // 2. Launch browser
        WebDriver driver = new ChromeDriver();

        try {
            // 3. Open your blog signup page
            driver.get("http://localhost:5173/register");

            // 4. Maximize window
            driver.manage().window().maximize();

            // 5. Enter username
            // Using xpath to find text input field
            driver.findElement(By.xpath("//input[@type='text']"))
                    .sendKeys("newUser123"); // CHANGE THIS TO YOUR DESIRED USERNAME

            // 6. Enter password
            // Using xpath to find password input field
            driver.findElement(By.xpath("//input[@type='password']"))
                    .sendKeys("newPassword123"); // CHANGE THIS TO YOUR DESIRED PASSWORD

            // 7. Click signup button
            driver.findElement(By.xpath("//button[@type='submit']"))
                    .click();

            // 8. Wait for page to load after signup
            Thread.sleep(3000);

            // 9. Get current URL after signup
            String currentUrl = driver.getCurrentUrl();
            System.out.println("Current URL: " + currentUrl);

            // 10. Validation - check if signup was successful (redirected to home)
            if (currentUrl.equals("http://localhost:5173/") || currentUrl.contains("/register") == false) {
                System.out.println("✅ TEST PASSED - Signup Successful!");
            } else {
                System.out.println("❌ TEST FAILED - Signup may have failed");
            }

        } catch (Exception e) {
            System.out.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 11. Close browser
            driver.quit();
        }

    }

}

