import { configure, defineRule } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  });

  defineRule("required", (value, target, ctx) => {
    if (value && value.toString().trim()) return true;
    else return ctx.field + " is required";
  });

  defineRule("email", (value, target, ctx) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      return true;
    else return ctx.field + " is invalid";
  });
  defineRule("password", (value, target, ctx) => {
    if (value && value.toString().length > 5) return true;
    else return ctx.field + " must be 6+ chars";
  });
  defineRule("confirmPassword", (value, target, ctx) => {
    if (ctx.form[target] != value) return "Password does't match";
    else return true;
  });

  defineRule("customQuill", (value, target, ctx) => {
    console.log(value);
    console.log("target", ctx.form[target]);
    if (ctx.form[target] === "" || ctx.form[target] === undefined) return true;
    else if (value == undefined || value.length == 0)
      return ctx.field + " is required";
    else return true;
  });
  defineRule("discount", (value, target, ctx) => {
    console.log("target", ctx.form[target], "value", value);
    if (ctx.form[target] === "" || ctx.form[target] === undefined) return true;
    else if (!value) return ctx.field + " is required";
    else return true;
  });

  defineRule("quill", (value, target, ctx) => {
    if ((value && value.length == 0) || !value)
      return ctx.field + " is required";
    else return true;
  });
});
