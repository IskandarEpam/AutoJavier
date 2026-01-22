*** Settings ***

Library   AppiumLibrary
Library   SeleniumLibrary
Resource  Global/FantasyMobileWeb.robot


*** Test Cases ***

WebTest
    FantasyWeb

MobileTest
    FantasyMobile

FantasyTest
    FantasyWebAndMobile



