import { GithubService } from '@/data/services/github-service';
import { container } from 'tsyringe';

container.register<GithubService>('GithubService', {
	useClass: GithubService,
});
