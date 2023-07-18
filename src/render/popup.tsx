import React, { JSXElementConstructor, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Absolute = styled.div<{ top: string| number, left?: string| number }>((props) => ({
    position: 'absolute',
    top: props.top ? props.top : '50%',
    left: props.left ? props.left : '50%'
}));


function Container(props) {
    const { position } = props;
    return <Absolute top={position?.y} left={position?.x}>{props.children}</Absolute>
}

export function PopUp() {
    const [child, setPortal] = useState<() => JSXElementConstructor<{}>>();
    PopUp['__setPortal'] = setPortal;

    return child ? ReactDOM.createPortal(<Container position={PopUp['__position']}>{child}</Container>, document.body) : null;
}

PopUp.show = (Child: React.JSX.Element, position?: { x:number, y:number }) => {
    PopUp['__position'] = position;
    PopUp['__setPortal'](Child);
}

PopUp.close = () => {
    PopUp['__setPortal'](null);
    PopUp['__position'] = null;
}
