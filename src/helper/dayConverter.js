function dayConverter(date) {
  switch (date) {
    case 1:
      return "Segunda-feira";

    case 2:
      return "Terça-feira";

    case 3:
      return "Quarta-feira";

    case 4:
      return "Quinta-feira";

    case 5:
      return "Sexta-feira";

    case 6:
      return "Sabado";

    case 0:
      return "Domingo";

    default:
      return "Dia da semana";
  }
}

export default dayConverter;
