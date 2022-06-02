import _ from 'lodash';
import { IJob } from '../../interfaces';

const getPermutation = <T extends IJob>(array: T[], n: number): T[][] => {
	if (array.length < n) {
		return [];
	}
	const recur = ((array: T[], n: number) => {
		if (--n < 0) {
			return [[]];
		}
		const permutations = [] as T[][];
		array.forEach((value, index, array) => {
			array = array.slice();
			array.splice(index, 1);
			recur(array, n).forEach(permutation => {
				permutation.unshift(value);
				permutations.push(permutation);
			});
		});
		return permutations;
	});
	return recur(array, n);
}

export { getPermutation };
