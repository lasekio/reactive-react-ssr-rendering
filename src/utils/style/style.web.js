export default (staticStyles, dynamicStyle = {}) => {
    staticStyles = staticStyles.constructor === Array ? staticStyles : [staticStyles];

    return {
        className: staticStyles.join(' '),
        style: dynamicStyle,
    };
};