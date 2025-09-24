// 지하철 노선도 컬러
export function getSubwayLineColor(line: number) {
  switch (line) {
    case 1:
      return '#00498B';
    case 2:
      return '#009246';
    case 3:
      return '#F36630';
    case 4:
      return '#00A2D1';
    case 5:
      return '#A664A3';
    case 6:
      return '#9E4510';
    case 7:
      return '#5D6519';
    case 8:
      return '#D6406A';
    default:
      return '#787878';
  }
}
