import { ButtonInteraction, GuildMember } from 'discord.js';

import { Button, ButtonDeferType } from './button.js';

export class JoinCommunityBrandingButton implements Button {
    public ids = ['join_community_branding'];
    public deferType = ButtonDeferType.REPLY_EPHEMERAL;
    public requireGuild = true;
    public requireEmbedAuthorTag = false;

    public async execute(intr: ButtonInteraction): Promise<void> {
        const member = intr.member as GuildMember;
        const roleName = 'CommunityBranding';

        // CommunityBranding 역할 부여
        try {
            const role = intr.guild.roles.cache.find(role => role.name === roleName);
            if (!role) {
                throw new Error(`${roleName} 역할을 찾을 수 없습니다.`);
            }

            await member.roles.add(role);
            await intr.editReply({
                content: `🎉 축하합니다! ${roleName} 권한이 부여되었습니다.`,
            });
        } catch (error) {
            console.error(error);
            await intr.editReply({
                content: `역할 부여 중 오류가 발생했습니다. 관리자에게 문의해주세요.`,
            });
        }
    }
}
