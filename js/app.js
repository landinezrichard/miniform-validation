document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#formulario");
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const btnSubmit = formulario.querySelector("button[type='submit']");
  const btnReset = formulario.querySelector("button[type='reset']");
  const spinner = document.querySelector("#loader");
  const inputCC = document.querySelector("#cc");

  const allForm = {
    email: false,
    asunto: false,
    mensaje: false,
    cc: true, //no requerido
  };

  // Asignar eventos
  // "blur" --> cuando el usuario sale del campo
  // "input" --> cuando el usuario escribe en el campo
  inputEmail.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  inputCC.addEventListener("blur", validar);

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputCC.addEventListener("input", validar);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  formulario.addEventListener("submit", enviarEmail);

  function validar(e) {
    if (e.target.value.trim() === "" && e.target.id !== "cc") {
      mostrarAlerta(
        `El campo ${e.target.name} es obligatorio`,
        e.target.parentElement
      );
      allForm[e.target.name] = false;
      comprobarAllform();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      allForm[e.target.name] = false;
      comprobarAllform();
      return;
    }

    if (e.target.id === "cc") {
      const valorCopia = e.target.value.trim();
      if (valorCopia !== "" && !validarEmail(valorCopia)) {
        mostrarAlerta("El email CC no es válido", e.target.parentElement);
        allForm[e.target.name] = false;
        comprobarAllform();
        return;
      }
    }

    limpiarAlerta(e.target.parentElement);

    // guardamos los valores en el objeto allForm
    // allForm[e.target.name] = e.target.value.trim().toLowerCase();
    allForm[e.target.name] = true;
    comprobarAllform();
    // console.log(e.target.value);
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function mostrarAlerta(mensaje, referencia) {
    // comprobar si ya existe alerta
    limpiarAlerta(referencia);

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "error-validacion"
    );

    referencia.appendChild(error);
    // console.log(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".error-validacion");
    if (alerta) {
      alerta.remove();
    }
  }

  function comprobarAllform() {
    // console.log(allForm);

    // comprobamos si todos los campos tienen un valor
    // if( Object.values(allForm).includes('') ){
    if (Object.values(allForm).includes(false)) {
      // desabilitar el boton
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    // habilitar el boton
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.add("hidden");
      resetFormulario();

      // alerta exito
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "mt-10",
        "rounded-lg",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "El mensaje se envió correctamente";
      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function resetFormulario() {
    // Reiniciar el objeto allForm
    allForm.email = false;
    allForm.asunto = false;
    allForm.mensaje = false;
    allForm.cc = true;

    // Limpiar los campos del formulario
    formulario.reset();

    comprobarAllform();
  }
});
