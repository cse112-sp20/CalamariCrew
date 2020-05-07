import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

/**
 * THIS TEST CLASS IS JUST AN EXAMPLE OF WHAT THINGS WOULD LOOK LIKE.
 *
 * As it stands now, these tests will fail because the xpaths are not filled
 * out in LoginPage for obvious reasons, but it still serves a good example
 */
public class LoginTest extends BaseWebTest {

    private LoginPage loginPage;
    private String correctEmail;
    private String correctPassword;
    private String incorrectPassword;

    @BeforeMethod
    public void initTestData(){
        correctEmail = "awesomeguy@gmail.com";
        correctPassword = "correct";
        incorrectPassword = "incorrect";
        loginPage = new LoginPage();
    }

    @Test
    public void testLoginCorrectCredentials(){
        loginPage.setEmail(correctEmail)
            .setPassword(correctPassword)
            .clickLogin();
        boolean isLoggedIn = true; // This is just a filler
        assertTrue(isLoggedIn);
    }

    @Test
    public void testLoginIncorrectCredentials(){
        loginPage.setEmail(correctEmail)
            .setPassword(incorrectPassword)
            .clickLogin();
        boolean isLoggedIn = false; // This is just a filler
        assertFalse(isLoggedIn);
    }

}
