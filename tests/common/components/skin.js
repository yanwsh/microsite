'use strict';

import jsdom from 'mocha-jsdom'
import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Skin from '../../../src/common/components/Skin/Skin'

const largeSizeScreen = {
    responsiveState: {
        greaterThan: {
            xl: false,
            lg: true,
            md: true,
            sm: true,
            xs: true,
            xxs: true
        }
    }
};

const smallSizeScreen = {
    responsiveState: {
        greaterThan: {
            xl: false,
            lg: false,
            md: false,
            sm: true,
            xs: true,
            xxs: true
        }
    }
};
function setup(responsive) {
    let props = Object.assign({
        leftImageURL: "Left.jpg",
        rightImageURL: "Right.jpg",
        clickThrough: "http://clickthough.org/",
        reportClickThrough: expect.createSpy()
    }, responsive);

    let renderer = TestUtils.createRenderer();
    renderer.render(<Skin {...props} />);

    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    }
}

describe('Skin Components', ()=>{
    jsdom();

    it('should show skin on large screen', ()=>{
        const { output, props } = setup(largeSizeScreen);

        expect(output.type).toBe('div');
        expect(output.props.className).toBe('Skin');

        let [skinLeft, skinRight] = output.props.children;

        expect(skinLeft.props.className).toBe('Skin--left');
        expect(skinRight.props.className).toBe('Skin--right');

        let leftCreative = skinLeft.props.children;
        expect(leftCreative.props.className).toBe('Skin--left__creative');
        let leftImage = leftCreative.props.children;
        expect(leftImage.props.src).toBe('Left.jpg');

        let rightCreative = skinRight.props.children;
        expect(rightCreative.props.className).toBe('Skin--right__creative');
        let rightImage = rightCreative.props.children;
        expect(rightImage.props.src).toBe('Right.jpg');

        leftCreative.props.onClick();
        expect(props.reportClickThrough.calls.length).toBe(1);

        rightCreative.props.onClick();
        expect(props.reportClickThrough.calls.length).toBe(2);
    });

    it('should hide skin on small screen', ()=>{
        const { output } = setup(smallSizeScreen);

        expect(output).toEqual(null);
    });
});
