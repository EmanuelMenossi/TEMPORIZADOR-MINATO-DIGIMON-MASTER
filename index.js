var intervalo;

function timeToRun() {
  let hora = document.getElementById("hora").value * 60;
  let minuto = document.getElementById("minuto").value * 1;
  let horaFinal = hora + minuto;
  return parseInt(horaFinal);
}

async function enviar(minuto) {
  const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

  const response = await fetch(GZAPPY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      user_token_id: "x",
    },
    body: JSON.stringify({
      instance_id: "x",
      instance_token: "x",
      message: [
        `🎉 A RUN DE MINATO VAI COMEÇAR EM TORNO DE ${minuto} MINUTOS! 🏃‍♂️💨 Prepare-se para a aventura! ⏰🔥 #LetsGo`,
      ],
      phone: "x",
    }),
  });

  const data = await response.json();

  console.log(data);
  // { msg: 'Messages sent' }
}

function iniciarTemporizador(hora) {
  let contagem = 0;
  let contMinuto = 0;
  let contHora = 1;
  let contVideo = 0;
  let video = document.getElementById("Video");
  function atualizarTempoRestante() {
    contagem++;
    if (contagem === 60) {
      contMinuto++;
      contagem = 0;
    }
    if (contMinuto === 120) {
      contHora++;
      contMinuto = 0;
    }
    const minutosRestantes = hora - contMinuto;
    const segundosRestantes = 60 - contagem;
    const tempoRestante = minutosRestantes * 60 + segundosRestantes;

    const horasRestantes = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = tempoRestante % 60;

    const tempoRestanteFormatado = `${horasRestantes}h ${minutos}m ${segundos}s`;
    document.title = tempoRestanteFormatado;
    if (horasRestantes === 0 && minutos === 0 && segundos === 2) {
      document.getElementById("tempo-restante").style.color = "white";
      document.getElementById(
        "feedback"
      ).innerText = ` MINATO RUN - ${contHora}x`;
      clearInterval(intervalo);
      reset();
    }

    if (horasRestantes === 0 && minutos <= 2) {
      contVideo++;
      if (contVideo === 1) {
        document.getElementById("tempo-restante").style.color = "red";
        document.getElementById("tempo-restante").style.fontWeight = "bold";
        video.play();
        video.muted = false;
        enviar(minutos);
      }
    }

    document.getElementById(
      "tempo-restante"
    ).innerText = `Tempo restante : ${tempoRestanteFormatado}`;
  }

  atualizarTempoRestante(hora); // Atualizar imediatamente ao iniciar
  setInterval(atualizarTempoRestante, 1000); // Atualizar a cada segundo
}

function reset() {
  iniciarTemporizador(120 - 1);
}

function init() {
  let hora = timeToRun();

  if (hora >= 1) {
    iniciarTemporizador(hora - 1);
    document.getElementById("feedback").innerText = ` MINATO RUN `;
    document.querySelector("#start").disabled = true;
  } else {
    document.getElementById("feedback").innerText = `Digite uma data valida! `;
  }
}

function reload() {
  location.reload();
}

