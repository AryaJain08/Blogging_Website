package com.selenium.test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class BlogLoginTest {

    public static void main(String[] args) {
        // 1. Set path of ChromeDriver
        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\LAPTOP\\Desktop\\chromedriver.exe");

        // 2. Launch browser
        WebDriver driver = new ChromeDriver();

        try {
            // 3. Open your blog login page - UPDATE PORT IF NEEDED
            driver.get("http://localhost:5173/login");

            // 4. Maximize window
            driver.manage().window().maximize();

            // 5. Enter username
            // Using xpath to find text input field
            driver.findElement(By.xpath("//input[@type='text']"))
                    .sendKeys("yourUsername"); // CHANGE THIS TO YOUR USERNAME

            // 6. Enter password
            // Using xpath to find password input field
            driver.findElement(By.xpath("//input[@type='password']"))
                    .sendKeys("yourPassword"); // CHANGE THIS TO YOUR PASSWORD

            // 7. Click login button
            driver.findElement(By.xpath("//button[@type='submit']"))
                    .click();

            // 8. Wait for page to load after login
            Thread.sleep(3000);

            // 9. Get current URL after login
            String currentUrl = driver.getCurrentUrl();
            System.out.println("Current URL: " + currentUrl);

            // 10. Validation - check if login was successful (redirected to home)
            if (currentUrl.equals("http://localhost:5173/") || currentUrl.contains("/login") == false) {
                System.out.println("✅ TEST PASSED - Login Successful!");
            } else {
                System.out.println("❌ TEST FAILED - Login may have failed");
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

