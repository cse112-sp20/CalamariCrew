import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.util.concurrent.TimeUnit;

import static com.codeborne.selenide.WebDriverRunner.getWebDriver;
import static com.codeborne.selenide.WebDriverRunner.setWebDriver;

/**
 * This class basically sets up the web driver and starts the browser for
 * every test class extending from it.
 */
public class BaseWebTest {

    @BeforeMethod()
    public void startBrowser(){

        /* We may want to test on different browsers but idk yet, we prolly aren't for this project.
         If that happens though, we will make a DriverFactory that takes as a parameter the browser we want,
         and then gives us back the appropriate webdriver. */
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        /* Implicit waits tell the driver how long to wait before throwing a NoSuchElementException.
        * For example when trying to click a button or assert on some condition for some field,
        * if that element is still loading onto the page, we don't instantly want to fail the test.
        * So instead, the driver will continuously try access that element for x amount of time
        * before deciding to give up */
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

        setWebDriver(driver);
    }

    @AfterMethod(alwaysRun = true)
    public void closeBrowser(){
        getWebDriver().quit();
    }

}
