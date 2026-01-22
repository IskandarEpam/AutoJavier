*** Settings ***


Library   SeleniumLibrary
Library   OperatingSystem
Library   DateTime
Resource  Variables.robot
Resource  Locators.robot


*** Keywords ***

Busqueda de Pasajes
  # Accepts flight row number as parameter, defaults to 5 if not provided
  [Arguments]                        ${flight_row}=5
  Set Screenshot Directory           ${EXECDIR}/Screenshots
  Open Browser                       ${URL}   chrome
  Maximize Browser Window
  Select From List By Value          ${Lst_Origen}  ${ORIGEN}
  Select From List By Value          ${Lst_Destino}  ${DESTINO}  
  Click Element                      xpath=/html/body/div[3]/form/div/input
  # Uses ${flight_row} variable to dynamically select different flight rows from the table
  Click Element                      xpath=/html/body/div[2]/table/tbody/tr[${flight_row}]/td[1]/input
  Wait Until Element Is Visible      xpath=//*[@id="inputName"]
  Input Text                         xpath=//*[@id="inputName"]         ${Nombre}
  Input Text                         xpath=//*[@id="address"]           ${Direccion}
  Input Text                         xpath=//*[@id="city"]              ${Ciudad}
  Input Text                         xpath=//*[@id="state"]             ${Estado}
  Input Text                         xpath=//*[@id="zipCode"]           ${ZIP}
  Select From List By Value          xpath=//*[@id="cardType"]          ${CardType}
  Input Text                         xpath=//*[@id="creditCardNumber"]  ${NumeroTarjeta}
  Input Text                         xpath=//*[@id="creditCardMonth"]   ${CardMonth}
  Input Text                         xpath=//*[@id="creditCardYear"]    ${CardYear}
  Input Text                         xpath=//*[@id="nameOnCard"]        ${NombreTarjeta}
  Checkbox Should Not Be Selected    xpath=/html/body/div[2]/form/div[11]/div/label/input
  Click Element                      xpath=/html/body/div[2]/form/div[11]/div/label/input
  Click Element                      xpath=/html/body/div[2]/form/div[11]/div/input
  Element Text Should Be             xpath=/html/body/div[2]/div/h1    Thank you for your purchase today!
  ${timestamp}=  Get Current Date    result_format=%Y%m%d_%H%M%S
  Capture Page Screenshot            ${EXECDIR}/Screenshots/screenshot_${timestamp}.png


  