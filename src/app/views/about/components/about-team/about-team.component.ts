import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TeamService } from '../../../../services/team.service';
import { TeamMemberCard } from '../../../../models/team-member.model';
import { resolveAssetUrl } from '../../../../core/utils/asset-url';

@Component({
  selector: 'app-about-team',
  imports: [RouterLink, TranslatePipe, CommonModule, SlickCarouselModule],
  templateUrl: './about-team.component.html',
  styles: [`
  .ca-team-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 12px;
  }

  .ca-team-iner-img {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  }

  .ca-team-iner-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .ca-iner-content-team {
    flex-shrink: 0;
  }

  .ca-team-iner-content {
    min-height: 190px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .ca-team-iner-heading {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ca-team-iner-heading p {
    margin-bottom: 8px;
  }

  ::ng-deep .ca-team-slider .slick-track {
    display: flex;
  }

  ::ng-deep .ca-team-slider .slick-slide {
    height: auto;
  }

  ::ng-deep .ca-team-slider .slick-slide > div {
    height: 100%;
  }

  ::ng-deep .ca-team-slider .slick-dots {
    position: static;
    margin-top: 20px;
  }
`]
})
export class AboutTeamComponent implements OnInit {
  teamData = {
    title: 'views.aboutTeam.title',
    subtitle: 'views.aboutTeam.subtitle',
    description: 'views.aboutTeam.description',
  };

  teamMembers: TeamMemberCard[] = [];
  loading = true;

  teamSlider = {
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  memberImage(member: TeamMemberCard): string {
    return resolveAssetUrl(member.image_url) || 'assets/img/team/no-profile.png';
  }
}
