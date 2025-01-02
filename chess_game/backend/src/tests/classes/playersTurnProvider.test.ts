import PlayersTurnProvider from '../../game/classes/Providers/PlayersTurnProvider';

describe('Test PlayersTurnProvider class', () => {

  const playersTurnProvider = new PlayersTurnProvider();

  it('get color with permission', () => {
    const colorWithPermission = playersTurnProvider.getColorWithPermissionToMove();
    expect(colorWithPermission).toBe('white');
  })

  it('get color with permission after change permissionі', () => {
    playersTurnProvider.changePermissionToMove();
    const colorWithPermission = playersTurnProvider.getColorWithPermissionToMove();
    expect(colorWithPermission).toBe('black');
  })
})