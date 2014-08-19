#Horizontalizer v.0.1

##Preface

Horizontalizer is a simple JQuery application that helps you you build horizontal websites. 

##Version control

v 0.1: not fully optimized, works mostly for computers. mobiles have to use clicks.

##Example

<insert jsfiddle example here>


##Installation instructions

* Include horizontalizer.js in your script after JQuery (since it depends on JQuery).
* Your html should look like this:

```html
<html>
<body>
    <div class="page">
        your first page here
    </div>
    <div class="page">
        your second page here
    </div>
</body>
</html>
```

And there you go: all you need to do is navigate with the keyboard (left and right).

### click function

horizontalizer supports a click function for links and button for easier navigation. Simply add a data attribute named page-id with the value being the page number. Here is an example:

```html
<a href="#" data-page-id="2">click me</a>
```

Clicking this link would get you to page 2.
Side note: first page is 1

## Additional information for mobile users

Better support for mobile users is still underway. Currently, the only way to navigate with mobiles is to use buttons, but I'm working on a touch move function that mobiles users could use.


