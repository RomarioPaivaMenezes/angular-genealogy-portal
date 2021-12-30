export class Localizacao{
    codigo?: number;
}

export class Casamento{
    codigo!: number;
    nomeNoivo!: string;
    nomeNoiva!: string;
    paisNoivo!: string;
    paisNoiva!: string;
    testemunhas!: string;
    localizacao = new Localizacao();
    dataCasamento!: Date;
    observacao!: string;
}

export class Permissao{
    codigo!: number;
    descricao!: string;
}

export class Usuario{
    codigo!: number;
    nome!: string;
    email!: string;
    senha!: string;
    permissoes: Permissao[] = [];
}