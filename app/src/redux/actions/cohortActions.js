export function gotUsersCohort(cohort) {
  return {
    type: "COHORT_GOT_USER_COHORT",
    payload: {cohort}
  };
}
