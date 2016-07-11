'use strict';

const siteConfig = {
    grid: {
        unitType: "px",
        breakpoints: {
            // Extra Extra small screen / phone
            xxs: 0,
            // Extra small screen / phone portrait
            xs: 480,
            // Small screen / phone landscape
            sm: 544,
            // Medium screen / tablet
            md: 768,
            // Large screen / desktop
            lg: 992,
            // Extra large screen / wide desktop
            xl: 1200
        },
        //Define the maximum width of `.container` for different screen sizes.
        max_width: {
            // xs: 512,
            // sm: 576,
            md: 720,
            lg: 940,
            xl: 1140
        }
    },
    routes: {
        //todo add routes by json, check documention here:  https://github.com/reactjs/react-router/tree/master/examples/huge-apps and https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
    }
};

module.exports = siteConfig;
