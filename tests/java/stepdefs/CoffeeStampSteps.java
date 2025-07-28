


  package stepdefs;
  import io.cucumber.java.en.*;
  public class CoffeeStampSteps{

  @Given ("the Loyalty App is open")
  public void loyalty_app_open(){
    // Add logic
  }
  
   @Given ("the QR Code scanner is open")
   public void qrScanner_app_open(){
    // Add logic
  }
  
   @When ("I scan the Coffee QR code")
   public void scan_qr_code(){
    // Simulate scanning the QR code
  }

    @Then ("I should see the coffee stamp appear")
   public void coffee_stamped(){
    // Assert that the coffee logo was stamped
  }
  
  }
  
