export default function registerValidation (values) {
    let errors = {};

    if (!values.name) {
        errors.name = "Name is required";
    }

    if (!values.enterprise) {
        errors.enterprise = "Enterprise name is required";
    }

    if (!values.url) {
        errors.url = "Product URL is required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Invalid URL";
    }

    if (!values.description) {
        errors.description = "Add some info about your product";
    }

    return errors;
}