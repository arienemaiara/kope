export const formatarFusoHorario = (dataFuso) => {
  try {
    let data = dataFuso.split(" ")[0];
    let hora = dataFuso.split(" ")[1];

    let dia = data.split("/")[0];
    let mes = data.split("/")[1];
    let ano = data.split("/")[2];

    var dataASerFormatada = new Date(`${ano}-${mes}-${dia}T${hora}:00.000Z`);
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };

    const formatted = new Intl.DateTimeFormat("pt-BR", options).format(
      dataASerFormatada
    );

    return formatted;
  } catch (error) {
    return "";
  }
};
