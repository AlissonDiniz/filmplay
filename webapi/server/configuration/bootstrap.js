import Movie from './../application/domain/movie';
import Serie from './../application/domain/serie';
import ArrayUtil from './../util/array-util';

import SecurityUser from './../application/domain/security-user';
import PasswordEncoder from './../util/password-encoder';

export default class Bootstrap {

    static async run() {
        await SecurityUser.create({
            username: 'admin@filmplay.com',
            password: PasswordEncoder.encode('Senha@10'),
        });

        await Serie.create({
            title: 'Billions',
            synopsis: 'Um procurador federal ambicioso inicia uma investigação implacável contra Bobby Axelrod, um bilionário que não joga para perder.',
            seasons: 4
        });
        await Serie.create({
            title: 'Suits',
            synopsis: 'Mesmo sem se formar e sem licença para advogar, um jovem brilhante impressiona um importante advogado e consegue uma cobiçada posição em sua firma.',
            seasons: 9
        });
        await Serie.create({
            title: 'How to Get Away With Murder',
            synopsis: 'A advogada criminal e professora Annalise Keating se envolve em um caso de assassinato junto com cinco de seus alunos.',
            seasons: 5
        });

        await Movie.create({
            title: 'Coringa',
            synopsis: 'O comediante falido Arthur Fleck encontra violentos bandidos pelas ruas de Gotham City. Desconsiderado pela sociedade, Fleck começa a ficar louco e se transforma no criminoso conhecido como Coringa.',
            minutes: 122
        });
        await Movie.create({
            title: 'O irlandês',
            synopsis: 'O Irlandês conta a história de Frank "The Irishman" Sheeran, um sindicalista e veterano da Segunda Guerra Mundial que se torna num assassino a soldo para a máfia.',
            minutes: 210
        });
        await Movie.create({
            title: 'Era Uma Vez em Hollywood',
            synopsis: 'No final da década de 1960, Hollywood começa a se transformar e o astro de TV Rick Dalton e seu dublê Cliff Booth tentam acompanhar as mudanças.',
            minutes: 160
        });
    }


}
