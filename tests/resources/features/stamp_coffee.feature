# User Story
#  As a customer , 
# I want to scan a QR code for coffee
# so that I get a coffee stamped

Feature: Coffee QR Code Stamping

  Scenario: Stamping the coffee loyalty card after scanning QR code
    Given the Loyalty App is open
    And the QR Code scanner is open
    When I scan the Coffee QR code
    Then I should see the coffee stamp appear
