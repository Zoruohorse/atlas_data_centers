// Chronologie documentaire cumulative. Une année seule n'est pas une date trimestrielle.
const quarterEnds=['03-31','06-30','09-30','12-31'];

export function documentaryDate(date) {
  return date.length===4 ? date+'-12-31' : date;
}

export function isDocumentedBy(date,cutoff) {
  return !cutoff || documentaryDate(date)<=cutoff;
}

export function quarterLabel(date) {
  const quarter=Math.ceil(Number(date.slice(5,7))/3);
  return 'T'+quarter+' '+date.slice(0,4);
}

export function makeTimeline(dates,revision) {
  const firstYear=Math.min(Number(revision.slice(0,4)),...dates.map(d=>Number(d.slice(0,4))));
  const lastYear=Number(revision.slice(0,4));
  const periods=[];
  for(let y=firstYear;y<=lastYear;y++){
    for(const ending of quarterEnds){
      const date=y+'-'+ending;
      if(date<revision)periods.push({date,label:quarterLabel(date)});
    }
  }
  // La dernière position correspond à la date réelle de révision, jamais à un trimestre futur.
  periods.push({date:'',label:'Base actuelle',revision});
  return periods;
}
