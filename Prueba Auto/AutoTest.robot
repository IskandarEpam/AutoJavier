*** Settings ***

Library   SeleniumLibrary
Library   OperatingSystem
Resource  Global/Variables.robot
Resource  Global/Locators.robot
Resource  Global/BusquedaPasajes.robot


*** Test Cases ***
BlazeDemo1
    Run Booking For All Passengers


*** Keywords ***

Run Booking For All Passengers
    # Clear all previous screenshots before starting the test run
    Empty Directory                     ${EXECDIR}/Screenshots
    # Read the entire CSV file content into a variable
    ${file_content}=    Get File        ${EXECDIR}/Datos/Pasajero.csv
    # Split the file content into individual lines (rows)
    ${lines}=    Evaluate            '''${file_content}'''.splitlines()
    # Loop through lines starting from index 1 (skips header row at index 0)
    FOR    ${index}    IN RANGE    1    ${lines.__len__()}
        # Get the current row from the lines list using the index
        ${data_row}=    Set Variable    ${lines}[${index}]
        # Split the row by commas and remove whitespace from each field
        ${fields}=    Evaluate    [f.strip() for f in '''${data_row}'''.split(',')]
        Set Suite Variable              ${Nombre}    ${fields}[0]
        Set Suite Variable              ${Direccion}    ${fields}[1]
        Set Suite Variable              ${Ciudad}    ${fields}[2]
        Set Suite Variable              ${Estado}    ${fields}[3]
        Set Suite Variable              ${ZIP}    ${fields}[4]
        Set Suite Variable              ${CardType}    ${fields}[5]
        Set Suite Variable              ${NumeroTarjeta}    ${fields}[6]
        Set Suite Variable              ${CardMonth}    ${fields}[7]
        Set Suite Variable              ${CardYear}    ${fields}[8]
        Set Suite Variable              ${NombreTarjeta}    ${fields}[9]
        # Assign flight row: first passenger (index 1) gets row 5, second passenger gets row 1
        ${flight_row}=    Set Variable If    ${index}==1    5    1
        # Call booking keyword with the selected flight row number
        Busqueda de Pasajes             ${flight_row}
        Close Browser
    END




