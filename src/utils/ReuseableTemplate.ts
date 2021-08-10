export interface TemplateInstance {
    apply(e: HTMLElement): boolean;
    isApplied(): boolean;
}

export class ReuseableTemplate {
    private instance: HTMLTemplateElement;
    constructor(private readonly template: string) {
    }

    private _get(): DocumentFragment {
        if (null == this.instance) {
            this.instance = document.createElement("template");
            this.instance.innerHTML = this.template;
        }
        return document.importNode(this.instance.content, true);
    }

    getInstance(): TemplateInstance {
        class TemplateInstance {
            private applied = false;

            constructor(private r: ReuseableTemplate) {
            }

            apply(e: HTMLElement): boolean {
                if (this.applied) {
                    return false;
                }
                e.appendChild(this.r._get());
                this.applied = true;
                return true;
            }
            isApplied() {
                return this.applied;
            }
        }
        return new TemplateInstance(this);
    }
}


