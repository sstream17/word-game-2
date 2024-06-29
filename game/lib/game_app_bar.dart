import 'package:flutter/material.dart';

class GameAppBar extends StatelessWidget implements PreferredSizeWidget {
  GameAppBar({super.key, this.title});

  final String? title;
  final FocusNode _buttonFocusNode = FocusNode(debugLabel: 'Menu Button');

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: title != null ? Text(title!) : null,
      centerTitle: true,
      elevation: 0,
      scrolledUnderElevation: 0,
      actions: [
        MenuAnchor(
          childFocusNode: _buttonFocusNode,
          menuChildren: const [
            MenuItemButton(
              child: Text("Menu item"),
            ),
          ],
          builder: (
            BuildContext context,
            MenuController controller,
            Widget? child,
          ) {
            return IconButton(
              focusNode: _buttonFocusNode,
              onPressed: () {
                if (controller.isOpen) {
                  controller.close();
                } else {
                  controller.open();
                }
              },
              icon: const Icon(Icons.more_vert),
            );
          },
        )
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
