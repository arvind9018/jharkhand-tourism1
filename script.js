function signupEvent(){

gtag('event','signup_click',{
event_category:'conversion',
event_label:'signup_button'
});

alert("Signup Click Tracked");

}

function pricingEvent(){

gtag('event','pricing_click',{
event_category:'conversion',
event_label:'pricing_button'
});

alert("Pricing Click Tracked");

}


function signupEvent(){

gtag('event','signup_click',{
event_category:'conversion',
event_label:'signup_button'
})

}

function pricingEvent(){

gtag('event','pricing_click',{
event_category:'conversion',
event_label:'pricing_button'
})

}

function formEvent(){

gtag('event','contact_form_submit',{
event_category:'lead',
event_label:'contact_form'
})

}