*** Settings ***

Library    AppiumLibrary
Library    SeleniumLibrary
Library    DateTime
Library    OperatingSystem


*** Keywords ***

FantasyWeb

    Set Screenshot Directory                             ${EXECDIR}/Screenshots
    Empty Directory                                      ${EXECDIR}/Screenshots
    Open Browser                                         https://www.fantasycritic.games/    Chrome
    Maximize Browser Window
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//*[@id="nav-collapse"]/ul[1]/li[3]/a/span   5s
    SeleniumLibrary.Click Element                        xpath=//*[@id="nav-collapse"]/ul[1]/li[3]/a/span
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//*[@id="vue-app"]/div[2]/div/div/main/div/div/div[4]/div/div[1]   5s
    SeleniumLibrary.Scroll Element Into View             xpath=//*[@id="__BVID__93__row_9efe8e2c-903d-49a0-a954-53c959372034"]/td[1]/span
    Sleep    2s
    SeleniumLibrary.Click Element                        xpath=//*[@id="__BVID__93__row_9efe8e2c-903d-49a0-a954-53c959372034"]/td[1]/span
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//a[@data-v-5a89ce25 and contains(@aria-describedby, '__bv_popover')]   5s  
    SeleniumLibrary.Execute JavaScript                   window.scrollBy(0, 300);
    SeleniumLibrary.Element Should Be Visible            xpath=//a[@data-v-5a89ce25 and contains(text(), 'Saros')]
    ${timestamp}=                                        Get Current Date    result_format=%Y%m%d_%H%M%S
    SeleniumLibrary.Capture Page Screenshot              ${EXECDIR}/Screenshots/screenshot_${timestamp}.png
    ${web_tooltip_text}=    SeleniumLibrary.Get Text     xpath=//a[@data-v-5a89ce25 and contains(text(), 'Saros')]
    Log                                                  Web tooltip text: ${web_tooltip_text}

FantasyMobile
   
    AppiumLibrary.Open Application                       http://127.0.0.1:4723    platformName=Android    deviceName=emulator-5554    appPackage=com.android.chrome    appActivity=com.google.android.apps.chrome.Main    automationName=UiAutomator2                     
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible          //android.widget.Button[@resource-id="com.android.chrome:id/signin_fre_continue_button"]    10s
    AppiumLibrary.Click Element                          //android.widget.Button[@resource-id="com.android.chrome:id/signin_fre_continue_button"]
    Sleep    5s
    AppiumLibrary.Click Element                          //android.widget.Button[@text='No thanks']
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible          //android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]    10s
    Sleep    5s
    AppiumLibrary.Click Element                          //android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]
    Sleep    5s
    AppiumLibrary.Go To Url                              https://www.fantasycritic.games/   
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible          //android.widget.Button[@content-desc="Toggle navigation"]    10s
    AppiumLibrary.Click Element                          //android.widget.Button[@content-desc="Toggle navigation"]
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible          //android.view.View[@content-desc="Games"]    10s
    AppiumLibrary.Click Element                          //android.view.View[@content-desc="Games"]
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible          //android.view.View[@resource-id="__BVID__80__BV_label_"]    10s
    AppiumLibrary.Scroll Down                            //android.widget.TextView[@text="Saros"]
    Sleep    2s
    AppiumLibrary.Click Element                          //android.widget.TextView[@text="Saros"]
    Sleep    2s
    AppiumLibrary.Wait Until Element Is Visible          //android.view.View[@resource-id="__bv_popover_367__"]    10s
    AppiumLibrary.Element Should Be Visible              //android.widget.TextView[@text="Saros"]
    ${mobile_tooltip_text}=    AppiumLibrary.Get Text    //android.widget.TextView[@text="Saros"]
    Log    Mobile tooltip text: ${mobile_tooltip_text}

FantasyWebAndMobile
    # WEB TEST
    Open Browser                                         https://www.fantasycritic.games/    Chrome
    Maximize Browser Window
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//*[@id="nav-collapse"]/ul[1]/li[3]/a/span   5s
    SeleniumLibrary.Click Element                        xpath=//*[@id="nav-collapse"]/ul[1]/li[3]/a/span
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//*[@id="vue-app"]/div[2]/div/div/main/div/div/div[4]/div/div[1]   5s
    SeleniumLibrary.Scroll Element Into View             xpath=//*[@id="__BVID__93__row_9efe8e2c-903d-49a0-a954-53c959372034"]/td[1]/span
    Sleep    2s
    SeleniumLibrary.Click Element                        xpath=//*[@id="__BVID__93__row_9efe8e2c-903d-49a0-a954-53c959372034"]/td[1]/span
    Sleep    2s
    SeleniumLibrary.Wait Until Element Is Visible        xpath=//a[@data-v-5a89ce25 and contains(@aria-describedby, '__bv_popover')]   5s  
    SeleniumLibrary.Execute JavaScript                   window.scrollBy(0, 300);
    SeleniumLibrary.Element Should Be Visible            xpath=//a[@data-v-5a89ce25 and contains(text(), 'Saros')]
    ${web_tooltip_text}=    SeleniumLibrary.Get Text     xpath=//a[@data-v-5a89ce25 and contains(text(), 'Saros')]
    Log    Web tooltip text: ${web_tooltip_text}
    Close Browser
    
    # MOBILE TEST
    AppiumLibrary.Open Application                 http://127.0.0.1:4723    platformName=Android    deviceName=emulator-5554    appPackage=com.android.chrome    appActivity=com.google.android.apps.chrome.Main    automationName=UiAutomator2                     
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible         //android.widget.Button[@resource-id="com.android.chrome:id/signin_fre_continue_button"]    10s
    AppiumLibrary.Click Element                         //android.widget.Button[@resource-id="com.android.chrome:id/signin_fre_continue_button"]
    Sleep    5s
    AppiumLibrary.Click Element                         //android.widget.Button[@text='No thanks']
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible         //android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]    10s
    Sleep    5s
    AppiumLibrary.Click Element                         //android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]
    Sleep    5s
    AppiumLibrary.Go To Url                             https://www.fantasycritic.games/   
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible         //android.widget.Button[@content-desc="Toggle navigation"]    10s
    AppiumLibrary.Click Element                         //android.widget.Button[@content-desc="Toggle navigation"]
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible         //android.view.View[@content-desc="Games"]    10s
    AppiumLibrary.Click Element                         //android.view.View[@content-desc="Games"]
    Sleep    5s
    AppiumLibrary.Wait Until Element Is Visible         //android.view.View[@resource-id="__BVID__80__BV_label_"]    10s
    AppiumLibrary.Scroll Down                           //android.widget.TextView[@text="Saros"]
    Sleep    2s
    AppiumLibrary.Click Element                         //android.widget.TextView[@text="Saros"]
    Sleep    2s
    AppiumLibrary.Wait Until Element Is Visible         //android.view.View[@resource-id="__bv_popover_367__"]    10s
    AppiumLibrary.Element Should Be Visible             //android.widget.TextView[@text="Saros"]
    ${mobile_tooltip_text}=    AppiumLibrary.Get Text    //android.widget.TextView[@text="Saros"]
    Log                                                 Mobile tooltip text: ${mobile_tooltip_text}
    Compare Tooltip Text    ${web_tooltip_text}    ${mobile_tooltip_text}

Compare Tooltip Text
    [Arguments]    ${web_text}    ${mobile_text}
    Should Be Equal    ${web_text}    ${mobile_text}    msg=Web and Mobile tooltip text don't match!
    Log    Tooltip text matches on both platforms: ${web_text}
