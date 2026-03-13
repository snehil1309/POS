document.addEventListener('DOMContentLoaded', () => {
    // Initialize Model
    const posModel = new PosModel();

    // Initialize View
    const posView = new PosView();

    // Initialize Controller
    const posController = new PosController(posModel, posView);
});
