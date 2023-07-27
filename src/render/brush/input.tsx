import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const WInput = styled.input({
    border: 'none',
    background: 'transparent',
    color: '#000',
    fontSize: '24px',
    '&:focus': {
        outline: 'none',
        boxShadow: 'none',
    }
})

export function Input({ shape, ctx }) {
    const ref = useRef<HTMLInputElement>(null);
    const [text, setText] = useState(shape.text);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    function onTextChange(evt) {
        console.log(evt.target.value);
        setText(evt.target.value)
    }

    function onBlur() {
        shape.fillText(text, ctx);
    }

    return <WInput ref={ref} value={text} onChange={onTextChange} onBlur={onBlur}></WInput>
}