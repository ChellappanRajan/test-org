import { LitElement, PropertyValueMap, css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { useFloatingUI } from './floating';


@customElement('my-modal')
export class MyModal extends LitElement {
  

  override render() {
    return html`
      <dialog style="visibility:hidden;all:unset;display:flex;align-items:center;justify-content:center;position:fixed;width:100vw;height:100vh;background:rgba(0,0,0,0.1);transition:all">
        <article style="
        inset-block-start:50%;
        inset-inline-start:50%;
        position:fixed;transform:translate(-50%,-50%);width:200px;height:auto;background:white">
            <slot></slot>
        </article>
      </dialog>
    `;
  }
}


@customElement('my-drawer')
export class MyDrawer extends LitElement {
   static override styles = css`
   article{
    transform:translateX(-100%);
    transition: all 2s;
    width:0;
   }
      .active{
        transform:translate(0);
        width:auto;

}
      `;

      
  @property() isAcitve = false;
  
  protected override firstUpdated(): void {
      this.shadowRoot?.querySelector('article')?.showPopover();
  }
  override render() {
    return html`
        <article class=${this.isAcitve ? 'active' : 'deactivate'} popover style="all:unset;position:fixed;transform:translate(0);height:100vh;width:30vw;background:white;z-index:1;right:0">
            <slot></slot>
            <div style="display:grid">
              <my-panel></my-panel>
         </div>
        </article>

    `;
  }
}



@customElement('my-panel')
export class MyPanel extends LitElement {
  
  @query('.popover') panelElement!:HTMLElement;

  @query('.trigger') triggerElement!:HTMLElement;
  

  private openPanel(){
    if (this.panelElement.style.display === 'block') {
      this.panelElement.style.display = 'none';
      this.panelElement.hidePopover();
    } else {
      this.panelElement.style.display = 'block';
      this.panelElement.showPopover();
    }


    useFloatingUI(this.triggerElement, this.panelElement);
    // this.panelElement.togglePopover();
  }

  override render() {
    return html`
     <div>
      <input class="trigger" @click=${this.openPanel}/>
      <div popover class="popover" style="display:none;width:200px;height:200px;border:1px solid red;margin:0">
         <div>
         My panel
        </div>
      </div>

     </div>
    `;
  }
}



@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  version = 'STARTING';
  @property() showDrawerProp = false;

  private showDrawer(){
    this.showDrawerProp = ! this.showDrawerProp ;
  }
  override render() {
    return html`
   
    <my-modal >
      <button @click=${this.showDrawer}>show</button>
    ${this.showDrawerProp ?
html`
<my-drawer>
    
    </my-drawer>
`
      : nothing
    }
    
 
    </my-modal>
    `;
  }
}

