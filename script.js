// custom form validation
class FormValidate {
  
    constructor(form, field) {
      
      // active form
      this.form = form;
      this.form.noValidate = true;
  
      // custom validation functions
      this.custom = [];
  
      // validate fields on focus change?
      this.validate = !!field;
      
      // field focusout event
      this.form.addEventListener('focusout', e => this.changeHandler(e) );
  
      // form submit event
      this.form.addEventListener('submit', e => this.submitHandler(e) );
      
    }
    
    
    // add a custom validation function
    // it's passed the field and must return true (valid) or false (invalid)
    addCustom(field, vfunc) {
  
      // get index
      let c = field.CustomValidator;
      if (typeof c === 'undefined') {
        c = this.custom.length;
        field.CustomValidator = c;
      }
  
      // store function reference
      this.custom[c] = (this.custom[c] || []).concat(vfunc);
  
    }
    
    
    // validate a field when focus changes
    changeHandler(e) {
  
      const t = e.target;
      if (this.validate && t && t.checkValidity) this.validateField(t);
  
    }
    
    
    // validate all fields on submit
    submitHandler(e) {
  
      // validate all fields
      let first, invCount = 0;
      Array.from(this.form.elements).forEach(f => {
  
        if (!this.validateField(f)) {
  
          // find first visible invalid
          if (f.offsetHeight) first = first || (f.focus && f);
          invCount++;
  
        }
  
      });
  
      // at least one field is invalid
      if (invCount) {
  
        // stop submission
        e.stopImmediatePropagation();
        e.preventDefault();
  
        // enable field focusout validation
        this.validate = true;
  
        // focus first invalid field
        if (first) {
          first.parentElement.scrollIntoView(true);
          setTimeout(() => first.focus(), 800);
        }
  
      }
       
      

      
      // form is valid - submit
      else if (this.submit) this.submit(e);
  
    }
    
    
    // validate a field
    validateField(field) {
  
      const
        parent = field.parentElement,
        c = field.CustomValidator,
        inv = 'invalid';
  
      field.setCustomValidity('');
  
      // default validation
      let valid = field.checkValidity();
  
      // custom validation
      if (valid && typeof c !== 'undefined') {
        valid = !this.custom[c].some(fn => !fn(field));
      }
  
      if (valid) {
  
        // field is valid
        parent.classList.remove(inv);
        return true;
  
      }
      else {
  
        // field is not valid
        field.setCustomValidity(inv);
        parent.classList.add(inv);
        return false;
  
      }
  
    }
    
  }
  
  // ___________________________________________________________________
  // validate contact form
  const contactForm = new FormValidate(document.getElementById('form'), false);
  
  // custom validation - email and/or telephone
  const
    email = document.getElementById('email'),
    tel = document.getElementById('num');
    
  
  contactForm.addCustom(email, f => f.value || tel.value);
  contactForm.addCustom(tel, f => f.value || email.value);
  
  // custom submit
  contactForm.submit = e => {
  
    e.preventDefault();
  
  
    const fd = new FormData(e.target);
    for (const [name, value] of fd.entries()) {
      console.log(name + ': ' + value);
    }
  
  }

  const pwd = document.getElementById('pwd');
  const cpwd = document.getElementById('cpwd');
  const confirmSpan = document.getElementById('confirm-pwd');
  const submitButton = document.getElementById('submit');
  cpwd.addEventListener('input', confirm);

  function confirm(e) {
      if (pwd.value != cpwd.value) {
          console.log('not match');
          confirmSpan.style.visibility="visible";
          submitButton.disabled = true;
          return false;
          
      } else {
          console.log('match');
          confirmSpan.style.visibility="hidden";
          submitButton.disabled = false;
          return true;
      }
  }
