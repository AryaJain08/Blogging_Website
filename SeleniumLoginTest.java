import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class SeleniumLoginTest {
    public static void main(String[] args) {
        // Set up Chrome driver - UPDATE THIS PATH to your chromedriver location
        System.setProperty("webdriver.chrome.driver", "C:\\path\\to\\chromedriver.exe");
        
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to login page - UPDATE PORT if different
            driver.get("http://localhost:5173/login");
            
            // Wait for page to load
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            
            // Find and fill username input
            WebElement usernameInput = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='text']"))
            );
            usernameInput.clear();
            usernameInput.sendKeys("testuser"); // CHANGE TO YOUR USERNAME
            
            // Find and fill password input
            WebElement passwordInput = driver.findElement(By.xpath("//input[@type='password']"));
            passwordInput.clear();
            passwordInput.sendKeys("testpass"); // CHANGE TO YOUR PASSWORD
            
            // Click login button
            WebElement loginButton = driver.findElement(By.xpath("//button[@type='submit']"));
            loginButton.click();
            
            // Wait for navigation
            Thread.sleep(3000);
            
            // Get current URL after login
            String currentUrl = driver.getCurrentUrl();
            System.out.println("Current URL after login: " + currentUrl);
            
            if (currentUrl.contains("localhost:5173") || currentUrl.equals("http://localhost:5173/")) {
                System.out.println("Login SUCCESSFUL!");
            } else {
                System.out.println("Login may have failed.");
            }
            
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Close browser
            driver.quit();
        }
    }
}

