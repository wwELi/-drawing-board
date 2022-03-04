import React, { memo } from "react";
import styled from "styled-components";

const cache = {};

function importAll(r) {
  r.keys().forEach((key) => {
      const name = key.match(/\/([^\/]+)\.icon.svg$/)[1] as string
      cache[name] = r(key).default;
  });
}

importAll(require['context']('../assets/', false, /\.icon\.svg$/));


const Size = styled.i`
    display: inline-block;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
`

function Icon(props) {
    const { name, size = 24, ...otherProps } = props; 

    function createIcon() {
        return { __html: cache[name] }
    }

    return <Size dangerouslySetInnerHTML={createIcon()} {...otherProps} size={size}></Size>
}

export default memo(Icon);
