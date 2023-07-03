// Webibazaar Variant Code For Product Card
class VariantWebiSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }
  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.dataset.product}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const modalContent = document.querySelector(`#webipro-${this.dataset.section}-${this.dataset.product}`);
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    // modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
  }
  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}-${this.dataset.product}`);
    if (!shareButton) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}-${this.dataset.product}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }
  renderProductInfo() {
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    // fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     const id = `price-${this.dataset.section}-${this.dataset.product}`;
    //     const html = new DOMParser().parseFromString(responseText, 'text/html')
    //     const destination = document.getElementById(id);
    //     const source = html.getElementById(id);
    //     if (source && destination) destination.innerHTML = source.innerHTML;
    //     const price = document.getElementById(`price-${this.dataset.section}-${this.dataset.product}`);
    //     if (price) price.classList.remove('visibility-hidden');
    //     this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    //   });
  }
  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}-${this.dataset.product}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
    if (!modifyClass) return;
  }
  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}-${this.dataset.product}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}-${this.dataset.product}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}
customElements.define('variant-webi-selects', VariantWebiSelects);
class VariantWebi extends VariantWebiSelects {
  constructor() {
    super(); 
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}
customElements.define('variant-webi', VariantWebi);



// Webibazaar Quickview Variant Code
class VariantWebiSelectsQuick extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }
  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-section-${this.dataset.product}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const modalContent = document.querySelector(`#webiprodemo-${this.dataset.section}-section-${this.dataset.product}`);
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    // modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
  }
  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}-section-${this.dataset.product}`);
    if (!shareButton) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}-section-${this.dataset.product}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;
    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }
  renderProductInfo() {
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    // fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=section`)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     const id = `price-section-${this.dataset.product}`;
    //     const html = new DOMParser().parseFromString(responseText, 'text/html')
    //     const destination = document.getElementById(id);
    //     const source = html.getElementById(id);

    //     if (source && destination) destination.innerHTML = source.innerHTML;

    //     const price = document.getElementById(`price-section-${this.dataset.product}`);

    //     if (price) price.classList.remove('visibility-hidden');
    //     this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    //   });
  }
  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}-section-${this.dataset.product}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
    if (!modifyClass) return;
  }
  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}-section-${this.dataset.product}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}-section-${this.dataset.product}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}
customElements.define('variant-webi-selectsquick', VariantWebiSelectsQuick);
class VariantWebiQuick extends VariantWebiSelectsQuick {
  constructor() {
    super(); 
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}
customElements.define('variant-webiquick', VariantWebiQuick);




// Webibazaar Cart Dropdown Code Start
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
class WebiQuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })
    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }
  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define('webi-quantity-input', WebiQuantityInput);

class WebiCartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.closest('webi-cart-items').updateQuantity(this.dataset.index, 0);
    });
  }
}
customElements.define('webi-cart-remove-button', WebiCartRemoveButton);

class WebiCartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, webiquantityInput) => total + parseInt(webiquantityInput.value), 0);
    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);
    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }
  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }
  getSectionsToRender() {
    return [
      {
        id: 'webi-main-cart-items',
        section: document.getElementById('webi-main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'webi-cart-live-region-text',
        section: 'webi-cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'webi-main-cart-footer',
        section: document.getElementById('webi-main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }
  updateQuantity(line, quantity, name) {
    this.enableLoading(line);
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });
    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartFooter = document.getElementById('webi-main-cart-footer');
        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));
        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem =  document.getElementById(`WbCartItem-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) lineItem.querySelector(`[name="${name}"]`).focus();
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        this.disableLoading();
      });
  }
  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document.getElementById(`Wb-Line-item-error-${line}`)
        .querySelector('.wb-cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          document.getElementById(`WbQuantity-${line}`).value
        );
    }
    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);
    const cartStatus = document.getElementById('webi-cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);
    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }
  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }
  enableLoading(line) {
    document.getElementById('webi-main-cart-items').classList.add('cart__items--disabled');
    this.querySelectorAll(`#WbCartItem-${line} .loading-overlay`).forEach((overlay) => overlay.classList.remove('hidden'));
    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }
  disableLoading() {
    document.getElementById('webi-main-cart-items').classList.remove('cart__items--disabled');
  }
}
customElements.define('webi-cart-items', WebiCartItems);
// Webibazaar Cart Dropdown Code End


// Product Card Price Change
$(document).ready(function() {
    $(document).on('click','variant-webi.new-swatch .inner-class .color-swatch',function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click','variant-webi.new-swatch .inner-class .color-swatch',function(){
        var merge_val = '';
        $(this).closest('variant-webi.new-swatch').find('.inner-class').each(function(){
            if(merge_val == ''){
                merge_val = $(this).find('.color-swatch.active').attr('data-val');
            }else{
                merge_val = merge_val + ' / ' + $(this).find('.color-swatch.active').attr('data-val');
            }
        });
        $(this).closest('.grid__item').find('[name="id"] option').each(function(){
            if($(this).attr('data-v-title') == merge_val){
            var price = $(this).attr('data-price');
            var cprice = $(this).attr('data-cprice');
            $(this).closest('.grid__item').find('.wbhprice .price__regular .price-item.price-item--regular').empty().html(price);
            $(this).closest('.grid__item').find('.wbhprice .price__sale .price-item.price-item--sale').empty().html(price);
                if(cprice != ''){
                    $(this).closest('.grid__item').find('.wbhprice .price__sale .price__compare .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbhprice .price__sale .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbhprice .price').addClass('price--on-sale');
                }
                else{
                    $(this).closest('.grid__item').find('.wbhprice .price').removeClass('price--on-sale');
                }
            }
        });
    });

    // Quickview Price Change
    $(document).on('click','variant-webiquick.new-swatch .inner-class .color-swatch',function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click','variant-webiquick.new-swatch .inner-class .color-swatch',function(){
        var merge_val = '';
        $(this).closest('variant-webiquick.new-swatch').find('.inner-class').each(function(){
            if(merge_val == ''){
                merge_val = $(this).find('.color-swatch.active').attr('data-val');
            }else{
                merge_val = merge_val + ' / ' + $(this).find('.color-swatch.active').attr('data-val');
            }
        });
        $(this).closest('.grid__item').find('[name="idquick"] option').each(function(){
            if($(this).attr('data-v-title') == merge_val){
            var price = $(this).attr('data-price');
            var cprice = $(this).attr('data-cprice');
            $(this).closest('.grid__item').find('.wbquickprice .price__regular .price-item.price-item--regular').empty().html(price);
            $(this).closest('.grid__item').find('.wbquickprice .price__sale .price-item.price-item--sale').empty().html(price);
                if(cprice != ''){
                    $(this).closest('.grid__item').find('.wbquickprice .price__sale .price__compare .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbquickprice .price__sale .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbquickprice .price').addClass('price--on-sale');
                }
                else{
                    $(this).closest('.grid__item').find('.wbquickprice .price').removeClass('price--on-sale');
                }
            }
        });
    });

    //  Product Tab With Banner Price Change
    $(document).on('click','variant-webitab.new-swatch .inner-class .color-swatch',function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click','variant-webitab.new-swatch .inner-class .color-swatch',function(){
        var merge_val = '';
        $(this).closest('variant-webitab.new-swatch').find('.inner-class').each(function(){
            if(merge_val == ''){
                merge_val = $(this).find('.color-swatch.active').attr('data-val');
            }else{
                merge_val = merge_val + ' / ' + $(this).find('.color-swatch.active').attr('data-val');
            }
        });
    $(this).closest('.grid__item').find('[name="id"] option').each(function(){
        if($(this).attr('data-v-title') == merge_val){
            var price = $(this).attr('data-price');
            var cprice = $(this).attr('data-cprice');
            $(this).closest('.grid__item').find('.wbhprice .price__regular .price-item.price-item--regular').empty().html(price);
            $(this).closest('.grid__item').find('.wbhprice .price__sale .price-item.price-item--sale').empty().html(price);
                if(cprice != ''){
                    $(this).closest('.grid__item').find('.wbhprice .price__sale .price__compare .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbhprice .price__sale .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbhprice .price').addClass('price--on-sale');
                }
                else{
                    $(this).closest('.grid__item').find('.wbhprice .price').removeClass('price--on-sale');
                }
            }
        });
    });

    // Product Tab With Banner Quickview Price Change
    $(document).on('click','variant-webitabquick.new-swatch .inner-class .color-swatch',function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click','variant-webitabquick.new-swatch .inner-class .color-swatch',function(){
        var merge_val = '';
        $(this).closest('variant-webitabquick.new-swatch').find('.inner-class').each(function(){
            if(merge_val == ''){
                merge_val = $(this).find('.color-swatch.active').attr('data-val');
            }else{
                merge_val = merge_val + ' / ' + $(this).find('.color-swatch.active').attr('data-val');
            }
        });
    $(this).closest('.grid__item').find('[name="idquick"] option').each(function(){
        if($(this).attr('data-v-title') == merge_val){
            var price = $(this).attr('data-price');
            var cprice = $(this).attr('data-cprice');
            $(this).closest('.grid__item').find('.wbquickprice .price__regular .price-item.price-item--regular').empty().html(price);
            $(this).closest('.grid__item').find('.wbquickprice .price__sale .price-item.price-item--sale').empty().html(price);
                if(cprice != ''){
                    $(this).closest('.grid__item').find('.wbquickprice .price__sale .price__compare .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbquickprice .price__sale .price-item.price-item--regular').empty().html(cprice);
                    $(this).closest('.grid__item').find('.wbquickprice .price').addClass('price--on-sale');
                }
                else{
                    $(this).closest('.grid__item').find('.wbquickprice .price').removeClass('price--on-sale');
                }
            }
        });
    });
    
});






// Webibazaar Variant Code Product Tab With Banner
class VariantWebiTabSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }
  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.dataset.block}-${this.dataset.product}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const modalContent = document.querySelector(`#webipro-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}`);
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    // modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
  }
  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}`);
    if (!shareButton) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }
  renderProductInfo() {
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    // fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     const id = `price-${this.dataset.section}-${this.dataset.product}`;
    //     const html = new DOMParser().parseFromString(responseText, 'text/html')
    //     const destination = document.getElementById(id);
    //     const source = html.getElementById(id);
    //     if (source && destination) destination.innerHTML = source.innerHTML;
    //     const price = document.getElementById(`price-${this.dataset.section}-${this.dataset.product}`);
    //     if (price) price.classList.remove('visibility-hidden');
    //     this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    //   });
  }
  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
    if (!modifyClass) return;
  }
  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}-${this.dataset.block}-${this.dataset.product}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}
customElements.define('variant-webi-tab-selects', VariantWebiTabSelects);
class VariantWebiTab extends VariantWebiTabSelects {
  constructor() {
    super(); 
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}
customElements.define('variant-webitab', VariantWebiTab);



// Webibazaar Quickview Tab With Banner Variant Code
class VariantWebiTabSelectsQuick extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }
  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const modalContent = document.querySelector(`#webiprodemo-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}`);
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    // modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if(this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }
  }
  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}`);
    if (!shareButton) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }
  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;
    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }
  renderProductInfo() {
    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    // fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=section`)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     const id = `price-section-${this.dataset.product}`;
    //     const html = new DOMParser().parseFromString(responseText, 'text/html')
    //     const destination = document.getElementById(id);
    //     const source = html.getElementById(id);

    //     if (source && destination) destination.innerHTML = source.innerHTML;

    //     const price = document.getElementById(`price-section-${this.dataset.product}`);

    //     if (price) price.classList.remove('visibility-hidden');
    //     this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
    //   });
  }
  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
    if (!modifyClass) return;
  }
  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}-section-${this.dataset.block}-${this.dataset.product}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}
customElements.define('variant-webi-tab-selectsquick', VariantWebiTabSelectsQuick);
class VariantWebiTabQuick extends VariantWebiTabSelectsQuick {
  constructor() {
    super(); 
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}
customElements.define('variant-webitabquick', VariantWebiTabQuick); 