# [Installing](https://github.com/nvie/gitflow/wiki/Installation) git-flow

    brew install git-flow

### Branches lifecycle

    git flow [feature | release | hotfix | support] start <name>
    git flow [feature | release | hotfix | support] finish <name>

#### Examples

##### Feature

    git flow feature start authentication
    git flow feature finish authentication

##### Release

    git flow release start 0.1.0
    git flow release finish 0.1.0

##### Hotfixing

    git flow hotfix start assets
    git flow hotfix finish assets

Based on [Using git-flow to automate your git branching workflow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)
