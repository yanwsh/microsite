'use strict';

var assets = require('../assets/index');

var pages = {
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
                        name: "MultiColumnsLayout",
                        type: "layouts",
                        props: {
                            columnNumber: 2,
                            column_1: {
                                className: "col-xs-4",
                                content: {
                                    name: "CustomText",
                                    type: "sections"
                                }
                            },
                            column_2: {
                                className: "col-xs-8",
                                content: {
                                    name: "Gallery",
                                    type: "components",
                                    props: {
                                        className: "col-xs-12",
                                        images: [
                                            {
                                                title: "PATH TO BE PROUD",
                                                links: [
                                                    {
                                                        media: "(min-width: 33.75em)",
                                                        srcset: assets.gallery['slider-4-lg']
                                                    },
                                                    {
                                                        media: "(max-width: 33.75em)",
                                                        srcset: assets.gallery['slider-4-sm']
                                                    }
                                                ]
                                            },
                                            {
                                                title: "UNITED STATES MARINE CORPS THE LAND WE LOVE",
                                                links: [
                                                    {
                                                        media: "(min-width: 33.75em)",
                                                        srcset: assets.gallery['slider-1-lg']
                                                    },
                                                    {
                                                        media: "(max-width: 33.75em)",
                                                        srcset: assets.gallery['slider-1-sm']
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },

                    // {
                    //     name: "PaginationSocialFeeds",
                    //     type: "components",
                    //     props: {
                    //         totalNumber: 3,
                    //         autoLoading: 2,
                    //         child: {
                    //             pattern: "BFTBTFTBFFTBTBF",//'B' is branded content, 'F' is facebook, 'T' is twitter
                    //             options: {
                    //                 root: {},
                    //                 facebook: {
                    //                     className: "col-md-3 col-xs-6 col-xxs-12",
                    //                     textMaxLength: 150
                    //                 },
                    //                 twitter: {
                    //                     className: "col-md-3 col-xs-6 col-xxs-12",
                    //                     textMaxLength: 150
                    //                 },
                    //                 brandContent: {
                    //                     className: "col-md-6 col-xxs-12",
                    //                     textMaxLength: 80,
                    //                     cta: {
                    //                         icon: "fa fa-plus",
                    //                         text: "READ ARTICLE"
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //
                    //     }
                    // }
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
                    leftImageURL: assets.skin['left'],
                    rightImageURL: assets.skin['right'],
                    clickThrough: "http://www.complex.com/"
                }
            }
        }
    }
};

module.exports = pages;
