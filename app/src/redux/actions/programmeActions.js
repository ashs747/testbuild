export function gotProgramme(programme) {
  return {
    type: "PROGRAMME_FETCHED",
    payload: programme
  };
}
