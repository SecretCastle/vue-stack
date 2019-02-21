<script>
import { Editor, BasicCustomToolbarMenu } from '@/components/ui/public/Editor';
export default {
    data() {
        return {
            content: ''
        }
    },
    components: {
        Editor
    },
    render(h) {
        return (
            <Editor
                change={this.contentChange}
                content={this.content}
                customer={true}
                uploadUrl={'http://upload.qiniup.com'}
            />
        )
    },
    methods: {
        contentChange(content) {
            const html = content.html;
            console.log(html);
        }
    }
}
</script>

