export const BasicCustomToolbarMenu = (h) => {
    return (
        <div>
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <button class="ql-underline">Underline</button>
            <button class="ql-strike">Strike</button>
            <button class="ql-blockquote">blockquote</button>
            <button class="ql-code-block">blockquote</button>
            <select class="ql-font">
                <option value="serif"></option>
                <option value="sansserif" selected></option>
                <option value="monospace"></option>
            </select>
            <select class="ql-size">
                <option value="small">small</option>
                <option value="false" selected>normal</option>
                <option value="large">large</option>
                <option value="huge">huge</option>
            </select>
            <select class="ql-align">
                <option value="">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
                <option value="justify">justify</option>
            </select>
            <select class="ql-header">
                <option value="1">h1</option>
                <option value="2">h2</option>
                <option value="3">h3</option>
                <option value="4">h4</option>
                <option value="false" selected>normal</option>
            </select>
            <button class="ql-list" value="ordered">ordered</button>
            <button class="ql-list" value="bullet">bullet</button>
            <button class="ql-script" value="sub">sub</button>
            <button class="ql-script" value="super">super</button>
            <button class="ql-indent" value="-1">super</button>
            <button class="ql-indent" value="+1">super</button>
            <button class="ql-direction" value="rtl">super</button>
            <button class="ql-color"></button>
            <button class="ql-background"></button>
            <button class="ql-clean"></button>
            <button class="ql-link"></button>
        </div>
    )
}

