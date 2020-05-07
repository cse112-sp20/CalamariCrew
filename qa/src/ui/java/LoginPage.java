import com.codeborne.selenide.Condition;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

/* Example Page Object for a LoginPage */
public class LoginPage extends BasePage {

    // TODO: Insert xpath for these elements here
    private SelenideElement emailField = $x("");

    private SelenideElement passwordField = $x("");

    private SelenideElement loginButton = $x("");

    private SelenideElement loginPageHeader = $x("");

    /*
     * Constructor asserts makes sure that we are on the login page if we try to create one.
     * This is important for a few reasons:
     *
     * 1. We prevent ourselves from constructing a LoginPage before we are on the page,
     * because doing so can lead to poor code and bad design.
     *
     * 2. It creates tracibility for failing tests and errors. Instead of proceeding, a test
     * will fail in the constructor, and we will know exactly where and why it failed.
     * - For example: Imagine we constructed a LoginPage but never ended up on the page due to
     * some issue or bug. We then continue to call something like loginPage.setEmail() , and
     * then fail in setEmail because the element cannot be found. This may cause confusion because
     * we may think at first that the error occurred due to an issue related to the setEmail method,
     * when in fact the error was something else entirely because we never loaded the page originally.
     *
     * One more thing to note: The shouldBe method is basically an assert for some condition.
     * We are basically just saying assertTrue(loginPageHeader.is(Condition.visible)) but with a twist.
     * What shouldBe does is perform an explicit wait, what that means is that, even if the condition / assert
     * fails, we will continue to check it for a certain amount of time before failing.
     */
    public LoginPage() {
        loginPageHeader.shouldBe(Condition.visible);
    }

    /* This is a matter of preference. The reason the methods return the object itself is so that
     we can write code in the style you will see in the LoginTest.java example. */

    public LoginPage setEmail(String email){
        emailField.setValue(email);
        return this;
    }

    public LoginPage setPassword(String password){
        passwordField.setValue(password);
        return this;
    }

    public LoginPage clickLogin(){
        loginButton.click();
        return this;
    }

}
