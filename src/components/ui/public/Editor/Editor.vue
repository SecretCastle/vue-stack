<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import _Quill from 'quill';
import defaultOptions from './defaultOptions';
import { BasicCustomToolbarMenu } from './customOptions';
import './font.css';
const Quill = window.Quill || _Quill;

export default {
    name: 'editor-vue',
    props: {
        customer: {
            type: Boolean,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        change: {
            type: Function,
            required: false,
            default: () => {}
        },
        content: String,
        value: String,
        url: String
    },
    data() {
        return {
            _content: ''
        }
    },
    render(h) {
        return (
            <div class="editor-vue">
                <div id="toolbar">
                    {BasicCustomToolbarMenu(h)}
                    <button class="ql-image"></button>
                    <button class="ql-video"></button>
                </div>
                <div ref="editor"></div>
            </div>
        )
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.quill = null;
        delete this.quill;
    },
    methods: {
        initOptions() {
            return {
                modules: {
                    toolbar: {
                        container: '#toolbar',
                        handlers: {
                            // image upload and insert quill
                            'image': (value) => {
                                if (value) {
                                    
                                }
                            },
                            // video upload and insert quill
                            'video': (value) => {
                                if (value) {
                                    
                                }
                            }
                        }
                    }
                }
            }
        },
        init() {
            if (this.$el) {
                // init custome options
                const init_options = this.customer ? this.initOptions() : {};
                // init options
                this._options = Object.assign({}, defaultOptions, init_options);
                // init instance
                this.quill = new Quill(this.$refs.editor, this._options);
                // set editor
                if (this.value || this.content) {
                    this.quill.pasteHTML(this.value || this.content);
                }
                // init editor enabled
                this.quill.enable(false);
                if (!this.disabled) {
                    this.quill.enable(true);
                }
                // text-change
                this.quill.on('text-change', (delta, oldDelta, source) => {
                    let html = this.$refs.editor.children[0].innerHTML;
                    const quill = this.quill;
                    const text = quill.getText();
                    this._content = html;
                    if (html === '<p><br></p>') {
                        html = '';
                    }
                    this.change({ html, text, quill });
                });
            }
        }
    },
    watch: {
        // watch content
        content(newVal, oldVal) {
            if (this.quill) {
                if (newVal && newVal !== this._content) {
                    this._content = newVal
                    this.quill.pasteHTML(newVal)
                } else if(!newVal) {
                    this.quill.setText('')
                }
            }
        },
        // watch value
        value(newVal, oldVal) {
            if (this.quill) {
                if (newVal && newVal !== this._content) {
                    this._content = newVal
                    this.quill.pasteHTML(newVal)
                } else if(!newVal) {
                    this.quill.setText('')
                }
            }
        },
        disabled(newVal, oldVal) {
            if (this.quill) {
                this.quill.enable(!newVal);
            }
        }
    }
}
</script>
