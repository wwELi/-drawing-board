import jss from 'jss'

const global = {
    '*': {
        margin: 0,
        padding: 0
    }
};

export function setGlobalStyle() {
    jss.createStyleSheet({
        '@global': global
    }).attach();
}

