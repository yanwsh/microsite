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
  },
  pages: {
    "home": {
      "type": "page",
      "layout": {
         // "header": {
         //    "name": "nav",
         //    "type": "component"
         // },
         "container": {
           name: "boxedLayout",
           type: "layouts",
           children: [
             {
               name: "PaginationSocialFeeds",
               type: "components",
               props: {
                 totalNumber: 3,
                 autoLoading: 2,
                 child: {
                   pattern: "BFTBTFTBFFTBTBF",//'B' is branded content, 'F' is facebook, 'T' is twitter
                   options: {
                     root: {

                     },
                     facebook: {
                       className: "col-md-3 col-xs-6 col-xxs-12",
                       textMaxLength: 150
                     },
                     twitter: {
                       className: "col-md-3 col-xs-6 col-xxs-12",
                       textMaxLength: 150
                     },
                     brandContent: {
                       className: "col-md-6 col-xxs-12",
                       textMaxLength: 80,
                       cta: {
                         icon: "fa fa-plus",
                         text: "READ ARTICLE"
                       }
                     }
                   }
                 }

               }
             }
           ]
         },
         // "footer": {
         //   "name": "footer",
         //   "type": "component"
         // }
        "skin": {
          name: "Skin",
          type: "components",
          props: {
            leftImageURL: "images/test/left.jpg",
            rightImageURL: "images/test/right.jpg",
            clickThrough: "http://www.complex.com/"
          }
        }
      }
    }
  }
};

module.exports = siteConfig;
